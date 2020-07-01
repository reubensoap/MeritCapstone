package com.meritamerica.capstone.models;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name="bank_account")
public abstract class BankAccount {
	
	protected double balance;
	protected double interestRate;
	protected java.util.Date accoutStartDate;
	@Id
	@Column(name = "bank_account_id")
	@GeneratedValue(strategy = GenerationType.TABLE)
	protected Integer accountNumber;
//	@OneToOne(cascade = CascadeType.ALL)
//	@JsonIgnore
//	@JoinColumn
//	private AccountHolder account;
	@OneToMany(cascade = CascadeType.ALL)
	private List<Transaction> transactions;

	
	public BankAccount() {
			
	}
	
	public BankAccount(double balance, double interestRate){
		this.balance = balance;
		this.interestRate = interestRate;
		accoutStartDate = new Date();
		
	}

	public BankAccount(double balance, double interestRate, java.util.Date accountOpenedOn){
		this.balance = balance;
		this.interestRate = interestRate;
		this.accoutStartDate = accountOpenedOn;	
	}


	public BankAccount(Integer accountNumber, double balance,
			double interestRate, java.util.Date accountOpenedOn){
		this.balance = balance;
		this.interestRate = interestRate;
		this.accoutStartDate = accountOpenedOn;
		this.accountNumber = accountNumber;
	}

	public Integer getAccountNumber() {
		return accountNumber;
	}

	public double getBalance() {
		return balance;
		
	}

	public double getInterestRate() {
		return interestRate;
	}

	public List<Transaction> getTransactions(){
		return transactions;
	}
	
	public void addTransaction(Transaction transaction) {
		transactions.add(transaction);
	}
	
//	public AccountHolder getAccount() {
//		return account;
//	}
//
//	public void setAccount(AccountHolder account) {
//		this.account = account;
//	}

	public boolean withdraw(double amount) {
		if(amount > 0 && amount < balance) {
			balance -= amount;
			return true;
		}
		return false;
	}

	public boolean deposit (double amount) {
		
		if(amount > 0) {
			balance += amount;
			return true;
		}
		return false;
	}


	public String writeToString() {
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		StringBuilder toString = new StringBuilder();
		toString.append(accountNumber).append(",");
		toString.append(balance).append(",");
		toString.append(getInterestRate()).append(",");
		toString.append(format.format(getAccoutStartDate()));
		return toString.toString();
	}
	
	void setBalance(double balance){
		this.balance = balance;
	}
	
	public void setInterestRate(double interestRate) {
		this.interestRate = interestRate;
	}
	
	public java.util.Date getAccoutStartDate() {
		return accoutStartDate;
	}
	
	public void setAccoutStartDate(java.util.Date accoutStartDate) {
		this.accoutStartDate = accoutStartDate;
	}
	
	public abstract double closingValue();

}
