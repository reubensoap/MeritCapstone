package com.meritamerica.capstone.models;

import javax.persistence.Entity;

@Entity
public class Transfer extends Transaction{
	public Transfer() {
		
	}
	public Transfer(int source,int target,double amount,String type){
		super(source,target,amount,type);
	}
	@Override
	public void process() {
		// TODO Auto-generated method stub
		
	}

}
