package com.meritamerica.capstone.controller;

import java.security.Principal;
import java.util.List;


import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.meritamerica.capstone.exception.AccountExistsException;
import com.meritamerica.capstone.exception.ExceedsCombinedLimitException;
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
import com.meritamerica.capstone.models.DBAccount;
import com.meritamerica.capstone.models.RegularIRA;
import com.meritamerica.capstone.models.RolloverIRA;
import com.meritamerica.capstone.models.RothIRA;
import com.meritamerica.capstone.models.SavingsAccount;
import com.meritamerica.capstone.models.User;
import com.meritamerica.capstone.repository.AccountHolderContactdetailsRepository;
import com.meritamerica.capstone.repository.AccountHolderRepository;
import com.meritamerica.capstone.repository.BankAccountRepository;
import com.meritamerica.capstone.repository.CDOfferingRepository;
import com.meritamerica.capstone.repository.UserRepository;
import com.meritamerica.capstone.security.JwtUtil;
import com.meritamerica.capstone.security.MyUserDetailsService;

@RestController
@PreAuthorize("isAuthenticated()")   
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
	private BankAccountRepository bankRepository;
	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtTokenUtil;
	Logger log =  LoggerFactory.getLogger(this.getClass());

	
	@PreAuthorize("permitAll()")
	@GetMapping(value = "/CDOfferings")
	public List<CDOffering> getCDOfferings(){
		log.info("Returned CDOfferings of MeritBank.");
		return cdoRepository.findAll();
	}
	
	@PreAuthorize("permitAll()")
	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authRequest) throws Exception{
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
	
	@PreAuthorize("permitAll()")
	@PostMapping(value = "/signup")
	public User signup(@RequestBody User user){
		if(userRepository.existsByUserName(user.getUserName())) {
			throw new BadCredentialsException("User name not available.");
		}
		user.setRoles("accountholder");
		userRepository.save(user);
		return user;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/CreateAccount")
	public AccountHolder createAccount(@RequestBody AccountHolder account, Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		account.setUser(user);
		user.setAccount(account);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@GetMapping(value = "/AccountHolder")
	public AccountHolder getAccountHolder(Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account= user.getAccount();
		log.info(user.getUserName() + " has  accessed their information.");
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/CheckingAccount")
	public CheckingAccount createCheckingAccount(Principal token, @RequestBody CheckingAccount checking) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().setChecking(checking);

		aRepository.save(user.getAccount());
		return checking;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/SavingsAccount")
	public SavingsAccount createSavingsAccount(Principal token, @RequestBody SavingsAccount savings) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().setSavings(savings);
		userRepository.save(user);
		return savings;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/DBAccount")
	public DBAccount createDBAccount(Principal token, @RequestBody DBAccount dbAccount) throws AccountExistsException, ExceedsCombinedLimitException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().addDBAccount(dbAccount);
		userRepository.save(user);
		return dbAccount;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/CDAccount")
	public CDAccount createCDAccount(Principal token, @RequestBody CDAccount cda) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().addCdAccount(cda);
		userRepository.save(user);
		return cda;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RolloverIRA")
	public RolloverIRA createRolloverIRA(Principal token, @RequestBody RolloverIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().setRolloverIRA(ira);
		userRepository.save(user);
		return ira;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RothIRA")
	public RothIRA createRothIRA(Principal token, @RequestBody RothIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().setRothIRA(ira);
		userRepository.save(user);
		return ira;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RegularIRA")
	public RegularIRA createRegularIRA(Principal token, @RequestBody RegularIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		user.getAccount().setRegularIRA(ira);
		userRepository.save(user);
		return ira;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/DeleteBankAccount/{id}")
	public boolean deleteBankAccount(){
		
		
		return true;
	}
}
