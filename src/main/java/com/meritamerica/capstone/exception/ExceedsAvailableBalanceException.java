package com.meritamerica.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ExceedsAvailableBalanceException extends Exception{
	public ExceedsAvailableBalanceException(){
	}
	
	public String toString() {
		return "You do not have enough to withdraw.";
	}
}
