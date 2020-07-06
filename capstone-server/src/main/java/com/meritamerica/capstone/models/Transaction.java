package com.meritamerica.capstone.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Transaction {
	
	@Id
	@Column(name = "transaction_id")
	@GeneratedValue(strategy = GenerationType.TABLE)
	private int id;
	private int target;
	private int source;
	protected double amount;
	protected java.util.Date date;
	private String type;
	
	Transaction(){
		
	}
	
	Transaction(int target, double amount, String type){
		this.target = target;
		this.amount = amount;
		this.type = type;
		this.date = new Date();
	}
	
	Transaction(int source, int target, double amount, String type){
		this.source = source;
		this.target = target;
		this.amount = amount;
		this.type = type;
		this.date = new Date();
	}
	
	public int getTarget() {
		return target;
	}
	public void setTarget(int target) {
		this.target = target;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public java.util.Date getDate() {
		return date;
	}
	public void setDate() {
		this.date = new Date();
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String toString() {
		return type;	
	}
	
	public abstract void process();
	
}
