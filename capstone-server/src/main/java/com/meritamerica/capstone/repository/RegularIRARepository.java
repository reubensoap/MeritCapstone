package com.meritamerica.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.meritamerica.capstone.models.CDOffering;
import com.meritamerica.capstone.models.DBAccount;
import com.meritamerica.capstone.models.RegularIRA;

@Repository
@Transactional
public interface RegularIRARepository extends JpaRepository<RegularIRA, Integer> {

	void deleteByaccountNumber(Integer accountNumber);
}
