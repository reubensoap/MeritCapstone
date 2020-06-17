package com.meritamerica.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class AccountExistsException extends Exception{
	public AccountExistsException(){
		super("An account already exists, either close the current "
				+ "account or change the type of account you wish to add");
	}
	
}
