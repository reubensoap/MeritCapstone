package com.meritamerica.capstone.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "checking_accounts", catalog = "meritbank")
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

	public static CheckingAccount readFromString(String accountData) throws ParseException{
		try {
			String[] temp = accountData.split(",");
			Date date = new SimpleDateFormat("dd/MM/yyyy").parse(temp[3]);
			CheckingAccount newAccount =  new CheckingAccount(Integer.valueOf(temp[0]),
					Double.valueOf(temp[1]),Double.valueOf(temp[2]),
					date);
			return newAccount;
		}catch(Exception e) {
			throw new NumberFormatException();
		}
	}
	
}