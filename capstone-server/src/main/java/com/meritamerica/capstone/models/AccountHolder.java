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

import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@JoinColumn
	private CheckingAccount checking;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private SavingsAccount savings;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn
	private List<DBAccount> dbAccounts;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private RolloverIRA rolloverIRA;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private RothIRA rothIRA;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private RegularIRA regularIRA;

	@OneToMany(cascade = CascadeType.ALL)

	@JoinColumn
	private List<CDAccount> cdAccounts;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private AccountHoldersContactDetails contact;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn
	@JsonIgnore
	private User user;

	public AccountHolder(){
		firstName = "";
		middleName = "";
		lastName = "";
		ssn = "";
	}

	public AccountHolder(String firstName, String middleName,
			String lastName, String ssn) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.ssn = ssn;
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
		this.checking = checking;
	}

	public SavingsAccount getSavings() {
		return savings;
	}

	public void setSavings(SavingsAccount savings) throws AccountExistsException {
		this.savings = savings;
	}

	public List<DBAccount> getDbAccount() {
		return dbAccounts;
	}

	public void addDBAccount(DBAccount dbAccount) throws ExceedsCombinedLimitException {
		dbAccounts.add(dbAccount);
	}

	public RolloverIRA getRolloverIRA() {
		return rolloverIRA;
	}

	public void setRolloverIRA(RolloverIRA rolloverIRA) throws AccountExistsException {
		this.rolloverIRA = rolloverIRA;
	}

	public RothIRA getRothIRA() {
		return rothIRA;
	}

	public void setRothIRA(RothIRA rothIRA) throws AccountExistsException {
		this.rothIRA = rothIRA;
	}

	public RegularIRA getRegularIRA() {
		return regularIRA;
	}

	public void setRegularIRA(RegularIRA regularIRA) throws AccountExistsException {
		this.regularIRA = regularIRA;
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

}