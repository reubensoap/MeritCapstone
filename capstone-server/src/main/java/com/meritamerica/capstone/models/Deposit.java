package com.meritamerica.capstone.models;

import javax.persistence.Entity;

@Entity
public class Deposit extends Transaction{
	public Deposit() {
		
	}
	public Deposit(int target,double amount,String type){
		super(target,amount,type);
	}

	@Override
	public void process() {
		// TODO Auto-generated method stub
		
	}
}
