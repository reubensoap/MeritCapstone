package com.meritamerica.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meritamerica.capstone.models.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Integer>{

}
