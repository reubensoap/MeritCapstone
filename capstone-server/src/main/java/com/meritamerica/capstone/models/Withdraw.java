package com.meritamerica.capstone.models;

import javax.persistence.Entity;

@Entity
public class Withdraw extends Transaction{
	public Withdraw() {
		
	}
	public Withdraw(int target,double amount,String type){
		super(target,amount,type);
	}
	@Override
	public void process() {
		// TODO Auto-generated method stub
		
	}

}
