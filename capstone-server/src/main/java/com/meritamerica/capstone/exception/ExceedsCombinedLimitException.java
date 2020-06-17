package com.meritamerica.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ExceedsCombinedLimitException extends Exception{
	
	public ExceedsCombinedLimitException(){
		super("You have reached the limit of this particular account type,"
				+ " either close an accout or change the account type");
	}
}
