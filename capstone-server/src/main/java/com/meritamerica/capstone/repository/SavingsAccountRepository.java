package com.meritamerica.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.meritamerica.capstone.models.BankAccount;
import com.meritamerica.capstone.models.CheckingAccount;

@Repository
@Transactional
public interface SavingsAccountRepository extends JpaRepository<BankAccount, Integer> {
	
	@Modifying
	@Query("delete from savings_account where bank_account_id=:accountNumber")
	void deleteByaccountNumber(@Param("accountNumber") Integer accountNumber);
	
//	void deleteByaccountNumber(Integer accountNumber);

}
