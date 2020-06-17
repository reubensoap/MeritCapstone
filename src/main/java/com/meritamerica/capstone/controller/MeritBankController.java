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

	
	@PreAuthorize("permitAll()")
	@GetMapping(value = "/CDOfferings")
	public List<CDOffering> getCDOfferings(){
		log.info("Returned CDOfferings of MeritBank.");
		return cdoRepository.findAll();
	}
	
	
}
