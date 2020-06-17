package com.meritamerica.capstone.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public abstract class Transaction {
	
	@Id
	@Column(name = "transaction_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;

}
