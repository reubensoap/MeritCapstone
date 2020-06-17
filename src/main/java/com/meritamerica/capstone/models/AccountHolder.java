package com.meritamerica.capstone.models;

import java.util.ArrayList;
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

import com.meritamerica.capstone.exception.AccountExistsException;
import com.meritamerica.capstone.exception.ExceedsCombinedLimitException;

@Entity
@Table(name = "account_holders", catalog = "meritbank")
public class AccountHolder{

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
	
	@OneToOne(cascade = CascadeType.ALL)
	@Column(name = "checking_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private CheckingAccount checking;
	
	@OneToOne(cascade = CascadeType.ALL)
	@Column(name = "savings_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private SavingsAccount savings;
	
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "dba_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private List<DBAccount> dbAccounts;
	
	@OneToOne(cascade = CascadeType.ALL)
	@Column(name = "rollover_ira_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private RolloverIRA rolloverIRA;
	
	@OneToOne(cascade = CascadeType.ALL)
	@Column(name = "roth_ira_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private RothIRA rothIRA;
	
	@OneToOne(cascade = CascadeType.ALL)
	@Column(name = "regular_ira_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private RegularIRA regularIRA;
	
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "cda_id")
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private List<CDAccount> cdAccounts;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	private AccountHoldersContactDetails contact;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private User user;
	
	public AccountHolder(){
		firstName = "";
		middleName = "";
		lastName = "";
		ssn = "";

		checking = new CheckingAccount();
		savings = new SavingsAccount();
		cdAccounts = new ArrayList<CDAccount>();
		dbAccounts = new ArrayList<DBAccount>();
		rolloverIRA = new RolloverIRA();
		rothIRA = new RothIRA();
		regularIRA = new RegularIRA();
	}

	public AccountHolder(String firstName, String middleName,
			String lastName, String ssn) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.ssn = ssn;

		checking = new CheckingAccount();
		savings = new SavingsAccount();
		cdAccounts = new ArrayList<CDAccount>();
		dbAccounts = new ArrayList<DBAccount>();
		rolloverIRA = new RolloverIRA();
		rothIRA = new RothIRA();
		regularIRA = new RegularIRA();
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

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public Integer getId() {
		return id;
	}

	public CheckingAccount getChecking() {
		return checking;
	}

	public void setChecking(CheckingAccount checking) throws AccountExistsException {
		if(checking == null) {
			this.checking = checking;
		}
		else{
			throw new AccountExistsException();
		}
	}

	public SavingsAccount getSavings() {
		return savings;
	}

	public void setSavings(SavingsAccount savings) throws AccountExistsException {
		if(savings == null) {
			this.savings = savings;
		}
		else{
			throw new AccountExistsException();
		}
	}

	public List<DBAccount> getDbAccount() {
		return dbAccounts;
	}

	public void addDBAccount(DBAccount dbAccount) throws ExceedsCombinedLimitException {
		if(this.dbAccounts.size() > 3) {
			this.dbAccounts.add(dbAccount);
		}
		else {
			throw new ExceedsCombinedLimitException();
		}
	}

	public RolloverIRA getRolloverIRA() {
		return rolloverIRA;
	}

	public void setRolloverIRA(RolloverIRA rolloverIRA) throws AccountExistsException {
		if(rolloverIRA == null) {
			this.rolloverIRA = rolloverIRA;
		}
		else{
			throw new AccountExistsException();
		}
	}

	public RothIRA getRothIRA() {
		return rothIRA;
	}

	public void setRothIRA(RothIRA rothIRA) throws AccountExistsException {
		if(rothIRA == null) {
			this.rothIRA = rothIRA;
		}
		else{
			throw new AccountExistsException();
		}
	}

	public RegularIRA getRegularIRA() {
		return regularIRA;
	}

	public void setRegularIRA(RegularIRA regularIRA) throws AccountExistsException {
		if(regularIRA == null) {
			this.regularIRA = regularIRA;
		}
		else{
			throw new AccountExistsException();
		}
	}

	public List<CDAccount> getCdAccount() {
		return cdAccounts;
	}

	public void addCdAccount(CDAccount cdAccount) {
		this.cdAccounts.add(cdAccount);
	}

	public AccountHoldersContactDetails getContact() {
		return contact;
	}

	public void setContact(AccountHoldersContactDetails contact) {
		this.contact = contact;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public void closeAccount(BankAccount account) {
		if(savings != null) {
			savings.deposit(account.closingValue());
			
		}
		else {
			savings = new SavingsAccount(account.closingValue());
		}
	}
	
}