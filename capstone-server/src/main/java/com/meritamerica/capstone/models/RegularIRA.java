package com.meritamerica.capstone.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
public class RegularIRA extends BankAccount{
	
	private static final double INTEREST_RATE = 0.01;


	public RegularIRA() {
		setBalance(0);
		setInterestRate(INTEREST_RATE);
		setAccoutStartDate(new Date());
	}


	@Override
	public double closingValue() {
		return balance * .8;
	}
	


}
