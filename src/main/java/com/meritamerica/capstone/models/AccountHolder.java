package com.meritamerica.capstone.models;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.meritamerica.capstone.exception.ExceedsCombinedBalanceLimitException;
import com.meritamerica.capstone.exception.NegativeAmountException;

@Entity
@Table(name = "account_holders", catalog = "meritbank")
public class AccountHolder implements Comparable<AccountHolder>{

	@NotBlank(message = "First name is required.")
	private String firstName;
	private String middleName;
	@NotBlank(message = "Last name is required.")
	private String lastName;
	@NotBlank(message = "SSN is required.")
	private String ssn;
	@Id
	@Column(name = "account_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "checking_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private List<CheckingAccount> checking;
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "savings_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private List<SavingsAccount> savings;
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "cda_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private List<CDAccount> cdAccount;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	AccountHoldersContactDetails contact;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	User user;
	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public AccountHoldersContactDetails getContact() {
		return contact;
	}

	public void setContact(AccountHoldersContactDetails contact) {
		this.contact = contact;
	}

	public AccountHolder(){
		firstName = "";
		middleName = "";
		lastName = "";
		ssn = "";

		checking = new LinkedList<CheckingAccount>();
		savings = new LinkedList<SavingsAccount>();
		cdAccount = new LinkedList<CDAccount>();
	}

	public AccountHolder(String firstName, String middleName,
			String lastName, String ssn) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.ssn = ssn;

		checking = new LinkedList<CheckingAccount>();
		savings = new LinkedList<SavingsAccount>();
		cdAccount = new LinkedList<CDAccount>();
	}


	public static AccountHolder readFromString(String accountHolderData) throws Exception{
		try {
			String[] temp = accountHolderData.split(",");
			AccountHolder newAccount =  new AccountHolder(temp[0],
					temp[1], temp[2], temp[3]);
			return newAccount;
		}catch(Exception e) {
			throw new Exception();
		}
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getMiddleName() {
		return middleName;
	}


	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getssn() {
		return ssn;
	}


	public void setssn(String ssn) {
		this.ssn = ssn;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CheckingAccount addCheckingAccount(double openingBalance) throws ExceedsCombinedBalanceLimitException, NegativeAmountException {
		if(getCheckingBalance() + getSavingsBalance() + openingBalance >= 250000) {
			throw new ExceedsCombinedBalanceLimitException("Combined balance of your Checking and Savings accounts can not exceed $250,000.");
		}
		if(openingBalance < 0) {
			throw new NegativeAmountException();
		}
		CheckingAccount newAccount = new CheckingAccount(openingBalance);
		checking.add(newAccount);
		return newAccount;
	}


	public CheckingAccount addCheckingAccount(CheckingAccount checkingAccount) throws com.meritamerica.capstone.exception.ExceedsCombinedBalanceLimitException, com.meritamerica.capstone.exception.NegativeAmountException{
		if(getCheckingBalance() + getSavingsBalance() + checkingAccount.getBalance() >= 250000) {
			throw new ExceedsCombinedBalanceLimitException("Combined balance of your Checking and Savings accounts can not exceed $250,000.");
		}
		if(checkingAccount.getBalance() < 0) {
			throw new NegativeAmountException();
		}
		checking.add(checkingAccount);
		return checkingAccount;
	}



	public List<CheckingAccount> getCheckingAccounts() {
		return checking;
	}


	public int getNumberOfCheckingAccounts() {
		return checking.size();
	}


	public double getCheckingBalance() {
		int i;
		double total = 0.0;
		for(i = 0; i < checking.size(); i++) {
			total += checking.get(i).getBalance();
		}
		return total;
	}


	public SavingsAccount addSavingsAccount(double openingBalance) throws com.meritamerica.capstone.exception.ExceedsCombinedBalanceLimitException, com.meritamerica.capstone.exception.NegativeAmountException {
		if(getCheckingBalance() + getSavingsBalance() + openingBalance >= 250000) {
			throw new ExceedsCombinedBalanceLimitException("Combined balance of your Checking and Savings accounts can not exceed $250,000.");
		}
		if(openingBalance < 0) {
			throw new NegativeAmountException();
		}
		SavingsAccount newAccount = new SavingsAccount(openingBalance);
		savings.add(newAccount);
		return newAccount;
	}


	public SavingsAccount addSavingsAccount(SavingsAccount savingsAccount) throws com.meritamerica.capstone.exception.ExceedsCombinedBalanceLimitException, com.meritamerica.capstone.exception.NegativeAmountException{
		if(getCheckingBalance() + getSavingsBalance() + savingsAccount.getBalance() >= 250000) {
			throw new ExceedsCombinedBalanceLimitException("Combined balance of your Checking and Savings accounts can not exceed $250,000.");
		}
		if(savingsAccount.getBalance() < 0) {
			throw new NegativeAmountException();
		}
		savings.add(savingsAccount);
		return savingsAccount;
	}


	public List<SavingsAccount> getSavingsAccounts() {
		return savings;
	}


	public int getNumberOfSavingsAccounts() {
		return savings.size();
	}


	public double getSavingsBalance() {
		double total = 0.0;
		for(SavingsAccount balance : savings) {
			total += balance.getBalance();
		}
		return total;

	}


	public CDAccount addCDAccount(CDOffering offering, double openingBalance) throws com.meritamerica.capstone.exception.NegativeAmountException{
		if(openingBalance < 0) {
			throw new NegativeAmountException();
		}
		CDAccount newAccount = new CDAccount(offering, openingBalance);
		cdAccount.add(newAccount);
		return newAccount;
	}


	public CDAccount addCDAccount(CDAccount cdAccount) throws com.meritamerica.capstone.exception.NegativeAmountException{
		if(cdAccount.getBalance() < 0) {
			throw new NegativeAmountException();
		}
		this.cdAccount.add(cdAccount);
		return cdAccount;
	}



	public List<CDAccount> getCDAccounts() {
		return cdAccount;
	}


	public int getNumberOfCDAccounts() {
		return cdAccount.size();
	}


	public double getCDBalance() {
		double total = 0.0;
		for(CDAccount balance : cdAccount) {
			total += balance.getBalance();
		}
		return total;
	}

	public double getCombinedBalance() {
		return getCDBalance() + getSavingsBalance() + getCheckingBalance();
	}



	public int compareTo(AccountHolder account) {
		if(this.getCombinedBalance() > account.getCombinedBalance()) {
			return 1;
		}
		else {
			return -1;
		}

	}


	public String writetoString() {
		StringBuilder toString = new StringBuilder();
		toString.append(firstName).append(",");
		toString.append(middleName).append(",");
		toString.append(lastName).append(",");
		toString.append(ssn);
		return toString.toString();
	}
}