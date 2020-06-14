package com.meritamerica.capstone.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "savings_account", catalog = "meritbank")
public class SavingsAccount extends BankAccount{
	private static final double INTEREST_RATE = 0.01;


	public SavingsAccount() {
		setBalance(0);
		setInterestRate(INTEREST_RATE);
		setAccoutStartDate(new Date());
	}
	
	public SavingsAccount(double openingBalance){
		super(openingBalance, INTEREST_RATE);
	}

	public SavingsAccount(Integer accountNumber, double balance,
		double interestRate, Date openedOn) {
		super(accountNumber, balance, interestRate, openedOn);
	}

	public static SavingsAccount readFromString(String accountData) throws ParseException{
		try {
			//0-accountNumber 1-balance 2-interestRate 3-date
			String[] temp = accountData.split(",");
			Date date = new SimpleDateFormat("dd/MM/yyyy").parse(temp[3]);
			SavingsAccount newAccount =  new SavingsAccount(Integer.valueOf(temp[0]),
					Double.valueOf(temp[1]),Double.valueOf(temp[2]),
					date);
		
			return newAccount;
		}catch(Exception e) {
			throw new NumberFormatException();
		}
	}
	
}