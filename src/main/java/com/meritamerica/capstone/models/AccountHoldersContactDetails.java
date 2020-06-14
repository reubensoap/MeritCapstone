package com.meritamerica.capstone.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "account_holders_contact_details", catalog = "meritbank")
public class AccountHoldersContactDetails {
	
	@Id
	@Column(name = "contact_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String firstName;
	private String middleName;
	private String lastName;

	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id", referencedColumnName = "account_id")
	@JsonIgnore
	private AccountHolder account;
	
	
	
	public AccountHoldersContactDetails() {
	}
	
	public AccountHoldersContactDetails(AccountHolder account) {
		this.firstName = account.getFirstName();
		this.middleName = account.getMiddleName();
		this.lastName = account.getLastName();
		this.account = account;
	}
	
	public AccountHolder getAccount() {
		return account;
	}
	public void setAccount(AccountHolder account) {
		this.account = account;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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

}
