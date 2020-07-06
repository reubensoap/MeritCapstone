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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.meritamerica.capstone.exception.AccountExistsException;
import com.meritamerica.capstone.exception.ExceedsAvailableBalanceException;
import com.meritamerica.capstone.exception.ExceedsCombinedLimitException;
import com.meritamerica.capstone.exception.InformationNotfound;
import com.meritamerica.capstone.exception.NegativeAmountException;
import com.meritamerica.capstone.exception.UnauthorizedException;
import com.meritamerica.capstone.models.AccountHolder;
import com.meritamerica.capstone.models.AccountHoldersContactDetails;
import com.meritamerica.capstone.models.AuthenticationRequest;
import com.meritamerica.capstone.models.AuthenticationResponse;
import com.meritamerica.capstone.models.BankAccount;
import com.meritamerica.capstone.models.CDAccount;
import com.meritamerica.capstone.models.CDOffering;
import com.meritamerica.capstone.models.CheckingAccount;
import com.meritamerica.capstone.models.DBAccount;
import com.meritamerica.capstone.models.Deposit;
import com.meritamerica.capstone.models.RegularIRA;
import com.meritamerica.capstone.models.RolloverIRA;
import com.meritamerica.capstone.models.RothIRA;
import com.meritamerica.capstone.models.SavingsAccount;
import com.meritamerica.capstone.models.Transfer;
import com.meritamerica.capstone.models.User;
import com.meritamerica.capstone.models.Withdraw;
import com.meritamerica.capstone.repository.AccountHolderContactdetailsRepository;
import com.meritamerica.capstone.repository.AccountHolderRepository;
import com.meritamerica.capstone.repository.BankAccountRepository;
import com.meritamerica.capstone.repository.CDAccountRepository;
import com.meritamerica.capstone.repository.CDOfferingRepository;
import com.meritamerica.capstone.repository.CheckingAccountRepository;
import com.meritamerica.capstone.repository.DBAccountRepository;
import com.meritamerica.capstone.repository.RegularIRARepository;
import com.meritamerica.capstone.repository.RolloverIRARepository;
import com.meritamerica.capstone.repository.RothIRARepository;
import com.meritamerica.capstone.repository.SavingsAccountRepository;
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
	DBAccountRepository DBARepository;
	@Autowired
	CDAccountRepository CDARepository;
	@Autowired
	RegularIRARepository regularRepository;
	@Autowired
	RolloverIRARepository rolloverRepository;
	@Autowired
	RothIRARepository rothRepository;
	@Autowired
	CheckingAccountRepository checkingRepository;
	@Autowired
	SavingsAccountRepository savingsRepository;
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
		log.info(user.getUserName() + " has  accessed their information.");
		return aRepository.findOne(user.getAccount().getId());
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/CheckingAccount")
	public CheckingAccount createCheckingAccount(Principal token, @RequestBody CheckingAccount checking) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		if(account.getChecking() != null) {
			throw new AccountExistsException();
		}
		account.setChecking(checking);
		aRepository.save(account);
		return checking;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/SavingsAccount")
	public SavingsAccount createSavingsAccount(Principal token, @RequestBody SavingsAccount savings) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		if(account.getSavings() != null) {
			throw new AccountExistsException();
		}
		account.setSavings(savings);
		aRepository.save(account);
		return savings;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/DBAccount")
	public DBAccount createDBAccount(Principal token, @RequestBody DBAccount dbAccount) throws AccountExistsException, ExceedsCombinedLimitException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		if(account.getDbAccount().size() == 3) {
			throw new AccountExistsException();
		}
		account.addDBAccount(dbAccount);
		aRepository.save(account);
		return dbAccount;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/CDAccount")
	public CDAccount createCDAccount(Principal token, @RequestBody CDAccount cda) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		account.addCdAccount(cda);
		aRepository.save(account);
		return cda;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RolloverIRA")
	public RolloverIRA createRolloverIRA(Principal token, @RequestBody RolloverIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		if(account.getRolloverIRA() != null) {
			throw new AccountExistsException();
		}
		account.setRolloverIRA(ira);
		aRepository.save(account);
		return ira;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RothIRA")
	public RothIRA createRothIRA(Principal token, @RequestBody RothIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		if(account.getRothIRA() != null) {
			throw new AccountExistsException();
		}
		account.setRothIRA(ira);
		aRepository.save(account);
		return ira;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/RegularIRA")
	public RegularIRA createRegularIRA(Principal token, @RequestBody RegularIRA ira) throws AccountExistsException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = user.getAccount();
		if(account.getRegularIRA() != null) {
			throw new AccountExistsException();
		}
		account.setRegularIRA(ira);
		aRepository.save(account);
		return ira;
	}

	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/CheckingAccount")
	public AccountHolder deleteCheckingAccount(Principal token) throws AccountExistsException, NegativeAmountException{
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		int id = account.getChecking().getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(account.getChecking().closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(account.getChecking().closingValue());
		}
		account.setChecking(null);
		aRepository.save(account);
		checkingRepository.deleteByaccountNumber(id);
		return aRepository.findOne(account.getId());
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/DBAccount/{id}")
	public AccountHolder deleteDBAccount(Principal token, @PathVariable("id") int id) throws AccountExistsException, ExceedsCombinedLimitException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		DBAccount dba = DBARepository.findOne(id);
		int accountNumber = dba.getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(dba.closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(dba.closingValue());
		}
		DBARepository.deleteByaccountNumber(accountNumber);
		account.getDbAccount().remove(dba);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/CDAccount/{id}")
	public AccountHolder deleteCDAccount(Principal token, @PathVariable("id") int id) throws AccountExistsException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		CDAccount cda = CDARepository.findOne(id);
		int accountNumber = cda.getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(cda.closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(cda.closingValue());
		}
		CDARepository.deleteByaccountNumber(accountNumber);
		account.getCdAccount().remove(cda);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/RolloverIRA")
	public AccountHolder deleteRolloverIRA(Principal token) throws AccountExistsException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		RolloverIRA rollover = rolloverRepository.findOne(account.getRolloverIRA().getAccountNumber());
		int id = rollover.getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(rollover.closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(rollover.closingValue());
		}
		rolloverRepository.deleteByaccountNumber(id);
		account.setRolloverIRA(null);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/RothIRA")
	public AccountHolder deleteRothIRA(Principal token) throws AccountExistsException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		RothIRA roth = rothRepository.findOne(account.getRothIRA().getAccountNumber());
		int id = roth.getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(roth.closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(roth.closingValue());
		}
		rothRepository.deleteByaccountNumber(id);
		account.setRothIRA(null);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/RegularIRA")
	public AccountHolder deleteRegularIRA(Principal token) throws AccountExistsException, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		RegularIRA regular = regularRepository.findOne(account.getRegularIRA().getAccountNumber());
		int id = regular.getAccountNumber();
		if(account.getSavings() == null) {
			SavingsAccount savings = new SavingsAccount(regular.closingValue());
			account.setSavings(savings);
		}
		else {
			account.getSavings().deposit(regular.closingValue());
		}
		regularRepository.deleteByaccountNumber(id);
		account.setRegularIRA(null);
		aRepository.save(account);
		return account;
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Delete/AccountHolder")
	public void deleteAccountHolder(Principal token) {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		aRepository.delete(account);
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Transfer/{type}/{from}/{to}/{amount}")
	public void transfer(Principal token, @PathVariable("type") String type, @PathVariable("from") int source,
			@PathVariable("to") int target, @PathVariable("amount") double amount) throws InformationNotfound, NegativeAmountException, ExceedsAvailableBalanceException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		Transfer trans = new Transfer(source, target, amount, type);
		Transfer trans2 = new Transfer(source, target,0-amount, type);
		account.findAccount(source).withdraw(amount);
		account.findAccount(target).deposit(amount);
		account.findAccount(source).addTransaction(trans2);
		account.findAccount(target).addTransaction(trans);
		aRepository.save(account);
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Withdraw/{type}/{to}/{amount}")
	public void withdraw(Principal token, @PathVariable("type") String type, @PathVariable("to") int target, @PathVariable("amount") double amount) throws InformationNotfound, NegativeAmountException, ExceedsAvailableBalanceException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		Withdraw trans = new Withdraw(target,0-amount, type);
		account.findAccount(target).withdraw(amount);
		account.findAccount(target).addTransaction(trans);
		aRepository.save(account);
	}
	
	@PreAuthorize("hasAuthority('accountholder')")
	@PostMapping(value = "/Deposit/{type}/{to}/{amount}")
	public void deposit(Principal token, @PathVariable("type") String type, @PathVariable("to") int target, @PathVariable("amount") double amount) throws InformationNotfound, NegativeAmountException {
		User user = userRepository.findByUserName(token.getName()).get();
		AccountHolder account = aRepository.findOne(user.getAccount().getId());
		Deposit trans = new Deposit(target, amount, type);
		account.findAccount(target).deposit(amount);
		account.findAccount(target).addTransaction(trans);
		aRepository.save(account);
	}
}
