package com.meritamerica.capstone.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity(name = "checking_account")
@Table(name = "checking_account", catalog = "meritbank")
public class CheckingAccount extends BankAccount{
	
	
	
	private static final double INTEREST_RATE = 0.0001;

	public CheckingAccount() {
		setBalance(0);
		setInterestRate(INTEREST_RATE);
		setAccoutStartDate(new Date());
	}
	public CheckingAccount(double balance){
		super(balance, INTEREST_RATE);
	}

	public CheckingAccount(Integer accountNumber, double balance,
			double interestRate, Date openedOn) {
			super(accountNumber, balance, interestRate, openedOn);
	}
	@Override
	public double closingValue() {
		return balance;
	}
	
}