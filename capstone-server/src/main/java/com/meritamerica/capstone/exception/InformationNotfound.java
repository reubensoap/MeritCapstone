package com.meritamerica.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InformationNotfound extends Exception{
	
	public InformationNotfound(String msg) {
		super(msg);
	}
}
