package com.meritamerica.capstone.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "dbaccount", catalog = "meritbank")
public class DBAccount extends BankAccount{
	
	private static final double INTEREST_RATE = 0.0001;
	
	String companyName;
	
	public DBAccount() {
		setBalance(0);
		setInterestRate(INTEREST_RATE);
		setAccoutStartDate(new Date());
		companyName = "";
	}
	
	public String getcompanyName() {
		return companyName;
	}
	
	public void setCompanyName(String name) {
		this.companyName = name;
	}

	@Override
	public double closingValue() {

		return balance;
	}
	

}
