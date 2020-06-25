package com.meritamerica.capstone.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadCredentialsException extends Exception{
	
	public BadCredentialsException(){
		super("User name not available");
	}

}
