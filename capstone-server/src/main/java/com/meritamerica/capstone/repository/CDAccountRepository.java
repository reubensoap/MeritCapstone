package com.meritamerica.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.meritamerica.capstone.models.CDAccount;
import com.meritamerica.capstone.models.CDOffering;
import com.meritamerica.capstone.models.DBAccount;

@Repository
@Transactional
public interface CDAccountRepository extends JpaRepository<CDAccount, Integer> {

	void deleteByaccountNumber(Integer accountNumber);
}
