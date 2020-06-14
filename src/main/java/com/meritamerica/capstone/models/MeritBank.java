package com.meritamerica.capstone.models;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

public class MeritBank {
	
	private static long accountNumber = 1;
	private static LinkedList<AccountHolder> accountHolders = new LinkedList<AccountHolder>();

	private static LinkedList<CDOffering> CDOfferings = new LinkedList<CDOffering>();

	

	public static void addAccountHolder(AccountHolder accountHolder) {
		accountHolders.add(accountHolder);
	}

	public static LinkedList<AccountHolder> getAccountHolders() {
		return accountHolders;
	}

	public static LinkedList<CDOffering> getCDOfferings() {
		return CDOfferings;
	}

	public static CDOffering getBestCDOffering(double depositAmount) {
		double best = 0.0; 
		CDOffering bestOffering = null;
		if(CDOfferings == null) {
			return null;
		}
		for(CDOffering offering :  CDOfferings) {
			if(futureValue(depositAmount, offering.getInterestRate(),
					offering.getTerm()) > best) {
				bestOffering = offering;
				best = futureValue(depositAmount, offering.getInterestRate(),
						offering.getTerm());
			}
		}
		return bestOffering;
	}

	public static CDOffering getSecondBestCDOffering(double depositAmount) {
		if(CDOfferings == null) {
			return null;
		}
		CDOffering bestOffering = null;
		double best = 0.0; 
		CDOffering secondBestOffering = null;
		
		for(CDOffering offering :  CDOfferings) {
			if(futureValue(depositAmount, offering.getInterestRate(),
					offering.getTerm()) > best) {
				secondBestOffering = bestOffering;
				bestOffering = offering;
				best = futureValue(depositAmount, offering.getInterestRate(),
						offering.getTerm());
			}
		}
		return secondBestOffering;
	}

	public static void clearCDOfferings() {
		CDOfferings = null;
	}

	public static void addCDOfferings(CDOffering offerings) {
		CDOfferings.add(offerings);
	}

	public static long getNextAccountNumber() {
		long currentAccountNumber = accountNumber;
		accountNumber++;
		return currentAccountNumber;
	}

	public static void setNextAccountNumber(long nextAccountNumber) {
		accountNumber = nextAccountNumber;
	}

//	public static boolean readFromFile(String fileName) {
//		CDOfferings = new CDOffering[0];
//		setNextAccountNumber(0);
//		AccountHolders = new AccountHolder[0];
//		fraudQueue = new FraudQueue();
//		//store the transactions here to be assigned to their account after all account have been made
//		Set<String> transactions = new HashSet<String>(); 
//		try(BufferedReader nextLine = new BufferedReader(new FileReader(fileName))) {
//			setNextAccountNumber(Long.valueOf(nextLine.readLine()));
//			int numberOfCDO = Integer.valueOf(nextLine.readLine());
//			for(int i = 0; i<numberOfCDO; i++) {
//				CDOfferings = Arrays.copyOf(CDOfferings, CDOfferings.length + 1);
//				CDOfferings[CDOfferings.length - 1] = CDOffering.readFromString(nextLine.readLine());
//			}
//			
//			int numOfAccountHolders = Integer.valueOf(nextLine.readLine());
//			for(int i = 0; i < numOfAccountHolders; i++) {
//				AccountHolder nextAccountHolder = AccountHolder.readFromString(nextLine.readLine());
//				MeritBank.addAccountHolder(nextAccountHolder);
//				
//				int numOfCheckingAccounts = Integer.valueOf(nextLine.readLine());
//				for(int c = 0; c < numOfCheckingAccounts; c++) {
//					nextAccountHolder.getCheckingAccounts().add(CheckingAccount.readFromString(nextLine.readLine()));
//					//nextAccountHolder.addCheckingAccount(CheckingAccount.readFromString(nextLine.readLine()));
//					int numCheckingtrans = Integer.valueOf(nextLine.readLine());
//					for(int ct = 0; ct < numCheckingtrans; ct++) {	
//						transactions.add(nextLine.readLine());
//					}
//				}
//				
//				int numOfSavingsACCOUNTS = Integer.valueOf(nextLine.readLine());
//				for(int s = 0; s < numOfSavingsACCOUNTS; s++) {
//					nextAccountHolder.getSavingsAccounts().add(SavingsAccount.readFromString(nextLine.readLine()));
//					//nextAccountHolder.addSavingsAccount(SavingsAccount.readFromString(nextLine.readLine()));
//					int numSavingstrans = Integer.valueOf(nextLine.readLine());
//					for(int st = 0; st < numSavingstrans; st++) {
//						transactions.add(nextLine.readLine());
//					}
//				}
//				
//				int numOfCDAccounts = Integer.valueOf(nextLine.readLine());
//				for(int cd = 0; cd < numOfCDAccounts; cd++) {
//					nextAccountHolder.getCDAccounts().add(CDAccount.readFromString(nextLine.readLine()));
//					//nextAccountHolder.addCDAccount(CDAccount.readFromString(nextLine.readLine()));
//					int numCDTrans = Integer.valueOf(nextLine.readLine());
//					for(int cdt = 0; cdt < numCDTrans; cdt++) {
//						transactions.add(nextLine.readLine());
//					}
//				}
//					
//			}
//			int numFraudQT = Integer.valueOf(nextLine.readLine());
//			for(int fqt = 0; fqt < numFraudQT; fqt++) {
//				fraudQueue.addTransaction(Transaction.readFromString(nextLine.readLine()));
//			}
//			for(String trans : transactions) {
//				Transaction newTran = Transaction.readFromString(trans);
//				if(newTran.getSourceAccount() == null) {
//					newTran.getTargetAccount().addTransaction(newTran);
//				}
//				else {
//					newTran.getTargetAccount().addTransaction(newTran);
//					newTran.getSourceAccount().addTransaction(newTran);
//				}
//			}
//			
//			return true;
//			
//		}catch(Exception e) {
//			return false;
//		}
//
//	}
	

//	public static boolean writeToFile(String fileName) {
//		try (BufferedWriter nextLine = new BufferedWriter(new FileWriter(fileName))){
//        	nextLine.write(String.valueOf(accountNumber));
//        	nextLine.newLine();
//        	nextLine.write(String.valueOf(CDOfferings.length));
//        	nextLine.newLine();
//        	for(int cdo = 0; cdo < CDOfferings.length; cdo++) {
//        		nextLine.write(CDOfferings[cdo].writeToString());
//            	nextLine.newLine();
//        	}
//        	nextLine.write(String.valueOf(AccountHolders.length));
//        	nextLine.newLine();
//        	for(int a = 0; a < AccountHolders.length; a++) {
//        		nextLine.write(AccountHolders[a].writetoString());
//        		nextLine.newLine();
//        		nextLine.write(String.valueOf(AccountHolders[a].getCheckingAccounts().size()));
//        		nextLine.newLine();
//        		for(int c = 0; c<AccountHolders[a].getCheckingAccounts().size(); c++ ) {
//        			nextLine.write(AccountHolders[a].getCheckingAccounts().get(c).writeToString());
//        			nextLine.newLine();
//        			nextLine.write(String.valueOf(AccountHolders[a].getCheckingAccounts().get(c).getTransactions().size()));
//        			nextLine.newLine();
//        			int ctl = AccountHolders[a].getCheckingAccounts().get(c).getTransactions().size();
//        			for(int ct = 0; ct < ctl; ct++) {
//        				nextLine.write(AccountHolders[a].getCheckingAccounts().get(c).getTransactions().get(ct).writeToString());
//        				nextLine.newLine();
//        			}
//        		}
//        		nextLine.write(String.valueOf(AccountHolders[a].getSavingsAccounts().size()));
//        		nextLine.newLine();
//        		for(int s = 0; s<AccountHolders[a].getSavingsAccounts().size(); s++ ) {
//        			nextLine.write(AccountHolders[a].getSavingsAccounts().get(s).writeToString());
//        			nextLine.newLine();
//        			nextLine.write(String.valueOf(AccountHolders[a].getSavingsAccounts().get(s).getTransactions().size()));
//        			nextLine.newLine();
//        			int stl = AccountHolders[a].getSavingsAccounts().get(s).getTransactions().size();
//        			for(int st = 0; st < stl; st++) {
//        				nextLine.write(AccountHolders[a].getSavingsAccounts().get(s).getTransactions().get(st).writeToString());
//        				nextLine.newLine();
//        			}
//        		}
//        		nextLine.write(String.valueOf(AccountHolders[a].getCDAccounts().size()));
//        		nextLine.newLine();
//        		for(int cd = 0; cd<AccountHolders[a].getCDAccounts().size(); cd++ ) {
//        			nextLine.write(AccountHolders[a].getCDAccounts().get(cd).writeToString());
//        			nextLine.newLine();
//        			nextLine.write(String.valueOf(AccountHolders[a].getCDAccounts().get(cd).getTransactions().size()));
//        			nextLine.newLine();
//        			int cdtl = AccountHolders[a].getCDAccounts().get(cd).getTransactions().size();
//        			for(int cdt = 0; cdt < cdtl; cdt++) {
//        				nextLine.write(AccountHolders[a].getCDAccounts().get(cd).getTransactions().get(cdt).writeToString());
//        				nextLine.newLine();
//        			}
//        		}
//        	}
//        	nextLine.write(String.valueOf(fraudQueue.getTransaction().size()));
//        	nextLine.newLine();
//        	for(int fq = 0; fq < fraudQueue.getTransaction().size(); fq++) {
//        		nextLine.write(fraudQueue.getTransaction().get(fq).writeToString());
//        		nextLine.newLine();
//        	}
//        	return true;
//		}catch(Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//	}


	public static LinkedList<AccountHolder> sortAccountHolders() {
		Collections.sort(accountHolders, new Comparator<AccountHolder>() {

			@Override
			public int compare(AccountHolder o1, AccountHolder o2) {
				if(o1.getCombinedBalance() > o2.getCombinedBalance()) {
					return 1;
				}
				else {
					return -1;
				}
			}
			
		});
		
		return accountHolders;
	}
	


	public static double totalBalances() {
		double total = 0.0;
		for(AccountHolder accounts : accountHolders) {
			total += accounts.getCombinedBalance();
		}
		return total;
	}

/**
 * 
 * Validates a transaction then processes it.
 * 
 * @param transaction the transaction to validate
 * @return true if the transaction is valid
 * @throws NegativeAmountException
 * @throws ExceedsAvailableBalanceException
 * @throws ExceedsFraudSuspicionLimitException
 */
//	public static boolean processTransaction(Transaction transaction) throws NegativeAmountException,
//	ExceedsAvailableBalanceException, ExceedsFraudSuspicionLimitException{
//		try {
//			transaction.processTrans(transaction);
//			return true;
//		}
//		catch(NegativeAmountException e) {
//			throw new NegativeAmountException();
//		}
//		catch(ExceedsAvailableBalanceException e) {
//			throw new ExceedsAvailableBalanceException();
//		}
//		catch(ExceedsFraudSuspicionLimitException e) {
//			throw new ExceedsFraudSuspicionLimitException();
//		}
//		catch(Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//	}



	public static double futureValue(double presentValue, double interestRate, int term) {
		return recursiveFutureValue(presentValue, term, interestRate);
	}

	public static double recursiveFutureValue(double amount, int years,
			double interestRate) {
		if(years > 0) {
			double newAmount = amount + (amount * interestRate);
			return recursiveFutureValue(newAmount, years - 1, interestRate);
		}
		return amount;
	}

	
	public static AccountHolder getAccountHolder(long accountId) {
		for(AccountHolder account: accountHolders) {
			if(accountId == account.getId()) {
				return account;
			}
		}
		return null;
	}
	
	public static BankAccount getBankAccount(long accountId) {
		for(AccountHolder account : accountHolders) {
			for(int c = 0; c < account.getCheckingAccounts().size(); c++) {
				if(accountId == account.getCheckingAccounts().get(c).getAccountNumber()) {
					return account.getCheckingAccounts().get(c);
				}
			}
			for(int s = 0; s < account.getSavingsAccounts().size(); s++) {
				if(accountId == account.getSavingsAccounts().get(s).getAccountNumber()) {
					return account.getSavingsAccounts().get(s);
				}
			}
			for(int cda = 0; cda < account.getCDAccounts().size(); cda++) {
				if(accountId == account.getCDAccounts().get(cda).getAccountNumber()) {
					return account.getCDAccounts().get(cda);
				}
			}
		}
		return null;
	}

}
