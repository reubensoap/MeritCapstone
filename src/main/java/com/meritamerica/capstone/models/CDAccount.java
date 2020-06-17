package com.meritamerica.capstone.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "cd_accounts", catalog = "meritbank")
public class CDAccount extends BankAccount{
	
	@ManyToOne
	@JoinColumn(name = "cd_id", referencedColumnName = "cd_id")
	CDOffering offering;
	private int term;
	
	public CDAccount() {
		setBalance(0);
		setInterestRate(0);
		setAccoutStartDate(new Date());
		term = 0;
	}
	public CDAccount(CDOffering offering, double openingBalance){
		super(openingBalance, offering.getInterestRate());
		this.offering = offering;
		this.term = offering.getTerm();
	}

	public CDAccount(Integer accountNumber, Double balance,
			Double interestRate, Date openedOn, int term) {
			super(accountNumber, balance, interestRate, openedOn);
			this.term = term;
	}

	public static CDAccount readFromString(String accountData) throws ParseException{
		try {
			String[] temp = accountData.split(",");
			Date date = new SimpleDateFormat("dd/MM/yyyy").parse(temp[3]);
			CDAccount newAccount =  new CDAccount(Integer.valueOf(temp[0]),
					Double.valueOf(temp[1]),Double.valueOf(temp[2]),
					date, Integer.valueOf(temp[4]));
			return newAccount;
		}catch(Exception e) {
			throw new NumberFormatException();
		}
	}

	public int getTerm() {
		return term;
	}

	public boolean withdraw(double amount) {
		return false;
	}

	public boolean deposit(double amount) {
		return false;
	}

	public String writeToString() {
		StringBuilder toString = new StringBuilder();
		toString.append(super.writeToString()).append(",");
		toString.append(term);
		return toString.toString();
	}
	@Override
	public double closingValue() {
		return balance * Math.pow(1 + offering.getInterestRate(), offering.getTerm());
	}
}
