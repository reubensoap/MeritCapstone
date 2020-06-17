package com.meritamerica.capstone.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "cd_offering", catalog = "meritbank")
public class CDOffering {
	
	@Id
	@Column(name = "cd_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@NotNull
	private int term;
	@NotNull
	private double interestRate;

	public CDOffering() {
		term = 0;
		interestRate = 0;
	}
	public CDOffering(int term, double interestRate){
		this.term = term;
		this.interestRate = interestRate;
	}

	public static CDOffering readFromString(String cdOfferingDataString){
		try {
			String[] temp = cdOfferingDataString.split(",");
			int tempTerm = Integer.valueOf(temp[0]);
			double tempInterestRate = Double.valueOf(temp[1]);
			CDOffering newAccount = new CDOffering(tempTerm, tempInterestRate);
			return newAccount;
		}catch(Exception e) {
			throw new NumberFormatException();
		}
	}

	public int getTerm() {
		return term;
	}

	public String writeToString() {
		StringBuilder toString = new StringBuilder();
		toString.append(term).append(",").append(interestRate);
		return toString.toString();
	}

	public double getInterestRate() {
		return interestRate;
	}

}
