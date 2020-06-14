package com.meritamerica.capstone.controller;

import java.security.Principal;
import java.util.List;


import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.meritamerica.capstone.exception.ExceedsCombinedBalanceLimitException;
import com.meritamerica.capstone.exception.InformationNotfound;
import com.meritamerica.capstone.exception.NegativeAmountException;
import com.meritamerica.capstone.exception.UnauthorizedException;
import com.meritamerica.capstone.models.AccountHolder;
import com.meritamerica.capstone.models.AccountHoldersContactDetails;
import com.meritamerica.capstone.models.AuthenticationRequest;
import com.meritamerica.capstone.models.AuthenticationResponse;
import com.meritamerica.capstone.models.CDAccount;
import com.meritamerica.capstone.models.CDOffering;
import com.meritamerica.capstone.models.CheckingAccount;
import com.meritamerica.capstone.models.SavingsAccount;
import com.meritamerica.capstone.models.User;
import com.meritamerica.capstone.repository.AccountHolderContactdetailsRepository;
import com.meritamerica.capstone.repository.AccountHolderRepository;
import com.meritamerica.capstone.repository.CDOfferingRepository;
import com.meritamerica.capstone.repository.UserRepository;
import com.meritamerica.capstone.security.JwtUtil;
import com.meritamerica.capstone.security.MyUserDetailsService;

@RestController
@RequestMapping("/")
public class MeritBankController {

	@Autowired
	AccountHolderRepository aRepository;
	@Autowired
	CDOfferingRepository cdoRepository;
	@Autowired
	AccountHolderContactdetailsRepository contactRepository;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtTokenUtil;
	Logger log =  LoggerFactory.getLogger(this.getClass());

	/**
	 * 
	 * Methods for creating AccountHolders 
	 * and their accounts accessible only by admin
	 * 
	 */
	@PostMapping(value = "/AccountHolders")
	@ResponseStatus(HttpStatus.CREATED)
	public AccountHolder addAccountHolder(@RequestBody @Valid AccountHolder accountHolder) {
		AccountHoldersContactDetails contact = new AccountHoldersContactDetails(accountHolder);
		User user = userRepository.findOne(accountHolder.getUser().getId());
		accountHolder.setContact(contact);
		user.setAccount(accountHolder);
		accountHolder.setUser(user);
		aRepository.save(accountHolder);
		log.info("AccontHolder created and added to MeritBank.");
		return accountHolder;
	}

	@PostMapping(value = "/AccountHolders/{id}/CheckingAccounts")
	@ResponseStatus(HttpStatus.CREATED)
	public CheckingAccount addCheckingAccount(@RequestBody CheckingAccount checking, @PathVariable("id") Integer id) throws InformationNotfound, ExceedsCombinedBalanceLimitException, NegativeAmountException {
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		log.info("CheckingAccount added to Account: " + id + ".");
		account.addCheckingAccount(checking);
		aRepository.save(account);
		return checking;
	}

	@GetMapping(value = "/AccountHolders/{id}/CheckingAccounts")
	public List<CheckingAccount> getCheckingAccounts(@PathVariable("id") Integer id) throws InformationNotfound{
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		log.info("Returned CheckingAccounts of Account: " + id + ".");
		return account.getCheckingAccounts();
	}

	@PostMapping(value = "/AccountHolders/{id}/SavingsAccounts")
	@ResponseStatus(HttpStatus.CREATED)
	public SavingsAccount addSavingsAccount(@RequestBody SavingsAccount savings, @PathVariable("id") Integer id) throws InformationNotfound, ExceedsCombinedBalanceLimitException, NegativeAmountException {
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		account.addSavingsAccount(savings);
		aRepository.save(account);
		log.info("SavingsAccount added to Account: " + id + ".");
		return savings;
	}

	@GetMapping(value = "/AccountHolders/{id}/SavingsAccounts")
	public List<SavingsAccount> getSavingsAccounts(@PathVariable("id") Integer id) throws InformationNotfound{
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		log.info("Returned SavingsAccounts of Account: " + id + ".");
		return account.getSavingsAccounts();
	}

	@PostMapping(value = "/AccountHolders/{id}/CDAccounts")
	@ResponseStatus(HttpStatus.CREATED)
	public CDAccount addCDAccount(@RequestBody CDAccount cdAccount, @PathVariable("id") Integer id) throws InformationNotfound, NegativeAmountException {
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		account.addCDAccount(cdAccount);
		aRepository.save(account);
		log.info("CDAccount added to Account: " + id + ".");
		return cdAccount;
	}

	@GetMapping(value = "/AccountHolders/{id}/CDAccounts")
	public List<CDAccount> getCDAccounts(@PathVariable("id") Integer id) throws InformationNotfound{
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found");
			throw new InformationNotfound("Account not found.");
		}
		log.info("Returned CDAccounts of Account: " + id + ".");
		return account.getCDAccounts();
	}

	@GetMapping(value = "/AccountHolders")
	public List<AccountHolder> getAccountHolders() {
		log.info("List of account holders in merit bank returned");
		return aRepository.findAll();
	}

	@GetMapping(value = "/AccountHolders/{id}")
	public AccountHolder getAccountHolderById(@PathVariable("id") Integer id) throws InformationNotfound {
		AccountHolder account = aRepository.findOne(id);
		if(account == null) {
			log.warn("Account not found searching by ID");
			throw new InformationNotfound("Account not found.");
		}
		log.info("Account " + id + " returned.");
		return account;
	}

	/**
	 * 
	 * Create and view CDOfferings
	 * Only Admin can creat Offerings
	 * AccountHolders and admin can view
	 * 
	 */
	@PostMapping(value = "/CDOfferings")	
	@ResponseStatus(HttpStatus.CREATED)
	public CDOffering addCDOffering(@RequestBody CDOffering offering) {
		cdoRepository.save(offering);
		log.info("CDOffering added to MeritBank.");
		return offering;
	}

	@GetMapping(value = "/CDOfferings")
	public List<CDOffering> getCDOfferings(){
		log.info("Returned CDOfferings of MeritBank.");
		return cdoRepository.findAll();
	}

	/**
	 * 
	 * authenticate user logging in
	 * 
	 */
	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> createAuthentication(@RequestBody AuthenticationRequest authRequest) throws Exception{
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));

		}
		catch(BadCredentialsException e) {
			throw new UnauthorizedException("Incorrect username or password");
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		log.info(authRequest.getUsername() + " has logged in.");
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	/**
	 * Create a user, only usable by admin 
	 * @param user
	 * @return
	 */
	@PostMapping(value = "/authenticate/createUser")
	public ResponseEntity<?> createUser(@RequestBody User user){
		userRepository.save(user);
		log.info("User with name " + user.getUserName() + " has  been created.");
		return ResponseEntity.ok(user);
	}

	/**
	 * 
	 * Methods to access and create accounts for that AccountHolder
	 * only available to accountHolders not admin
	 * 
	 */
	@GetMapping(value = "/Me")
	public AccountHolder getMe(Principal token){
		User user = userRepository.findByUserName(token.getName()).get();
		log.info(user.getUserName() + " has  accessed their information.");
		return aRepository.findOne(user.getAccount().getId());
	}
	//public AccountHolder getMe(@AuthenticationPrincipal User userDetails) {
	@PostMapping(value = "/Me/CheckingAccounts")
	public CheckingAccount addMeChecking(Principal token, @RequestBody CheckingAccount checking) throws ExceedsCombinedBalanceLimitException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		account.addCheckingAccount(checking);
		aRepository.save(account);
		return checking;
	}

	@GetMapping(value = "/Me/CheckingAccounts")
	public List<CheckingAccount> getMeChecking(Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		return aRepository.findOne(user.getAccount().getId()).getCheckingAccounts();
	}

	@PostMapping(value = "/Me/SavingsAccounts")
	public SavingsAccount addMeSavings(Principal token, @RequestBody SavingsAccount savings) throws ExceedsCombinedBalanceLimitException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		account.addSavingsAccount(savings);
		aRepository.save(account);
		return savings;
	}

	@GetMapping(value = "/Me/SavingsAccounts")
	public List<SavingsAccount> getMeSavings(Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		return aRepository.findOne(user.getAccount().getId()).getSavingsAccounts();
	}

	@PostMapping(value = "/Me/CDAccounts")
	public CDAccount addMeCDAccount(Principal token, @RequestBody CDAccount cdAccount) throws ExceedsCombinedBalanceLimitException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		account.addCDAccount(cdAccount);
		aRepository.save(account);
		return cdAccount;
	}

	@GetMapping(value = "/Me/CDAccounts")
	public List<CDAccount> getMeCDAccount(Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		return aRepository.findOne(user.getAccount().getId()).getCDAccounts();
	}
	
}
