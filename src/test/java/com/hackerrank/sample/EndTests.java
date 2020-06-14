package com.hackerrank.sample;


import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import com.meritamerica.capstone.Application;
import com.meritamerica.capstone.controller.MeritBankController;
import com.meritamerica.capstone.models.User;
import com.meritamerica.capstone.repository.AccountHolderRepository;
import com.meritamerica.capstone.repository.UserRepository;
@RunWith(SpringRunner.class)
@SpringBootTest (classes={ Application.class })
@WebAppConfiguration
public class EndTests {
	

	
	@Autowired
	private MeritBankController controller;
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	@Autowired
	private AccountHolderRepository aRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	private MockMvc mockMvc;
	
	@Before
	public void setUp() {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();
		final User user = new User();
		user.setUserName("sadiq");
		user.setPassword("pass");
		user.setRoles("accountHolder");
		uRepo.save(user);
	}
	
	@Test
	public void testcreatUser() throws Exception {
		mockMvc.perform(post("/authenticate/createUser")
		           .contentType(MediaType.APPLICATION_JSON)
		           .content("{\r\n" + 
		           		"    \"id\": 2,\r\n" + 
		           		"    \"userName\": \"sadiq\",\r\n" + 
		           		"    \"password\": \"pass\",\r\n" + 
		           		"    \"active\": true,\r\n" + 
		           		"    \"roles\": \"accountholder\"\r\n" + 
		           		"}") 
		           .accept(MediaType.APPLICATION_JSON))
		           .andExpect(status().isOk())
		           .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		           .andExpect(jsonPath("$.id").value(2)) 
		           .andExpect(jsonPath("$.userName").value("sadiq"))
		           .andExpect(jsonPath("$.password").value("pass"));
	}
	
	@Test
	public void testAccountHolder() throws Exception {
		mockMvc.perform(post("/AccountHolders")
		           .contentType(MediaType.APPLICATION_JSON)
		           .content("{\r\n" + 
		           		"	\"firstName\": \"Sadiq\",\r\n" + 
		           		"	\"lastName\": \"Manji\",\r\n" + 
		           		"	\"ssn\": \"123456789\",\r\n" + 
		           		"	\"contact\" : {\r\n" + 
		           		"		\"phone\": \"5552121212\"\r\n" + 
		           		"	},\r\n" + 
		           		"	\"user\" : {\r\n" + 
		           		"		\"id\": 2\r\n" + 
		           		"	}\r\n" + 
		           		"}") 
		           .accept(MediaType.APPLICATION_JSON))
		           .andExpect(status().isCreated())
		           .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
		           .andExpect(jsonPath("$.firstName").value("Sadiq")) 
		           .andExpect(jsonPath("$.lastName").value("Manji"))
		           .andExpect(jsonPath("$.ssn").value("123456789")); 
	}
	
}
