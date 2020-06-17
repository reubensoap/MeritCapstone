package com.meritamerica.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NegativeAmountException extends Exception{

	public NegativeAmountException(){
	}
	public String toString() {
		return "Can not work with negative numbers";
	}
	
}
