package com.vti.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AccountException extends RuntimeException {
	public AccountException(String message) {
		super(message);
	}

}
