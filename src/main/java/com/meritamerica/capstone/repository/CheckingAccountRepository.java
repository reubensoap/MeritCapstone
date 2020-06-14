package com.meritamerica.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meritamerica.capstone.models.BankAccount;
import com.meritamerica.capstone.models.CheckingAccount;

public interface CheckingAccountRepository extends JpaRepository<BankAccount, Integer> {

}
