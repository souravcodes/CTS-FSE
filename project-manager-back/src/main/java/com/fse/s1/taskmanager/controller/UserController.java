package com.fse.s1.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fse.s1.taskmanager.service.IUserService;
import com.fse.s1.taskmanager.to.UserTo;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@RequestMapping(value="/add", method=RequestMethod.POST, consumes="application/json", produces="application/json")
	public UserTo addUser(@RequestBody UserTo userTo){
		return userService.addUser(userTo);
	}
	
	@RequestMapping(value="/", method=RequestMethod.GET, produces="application/json")
	public List<UserTo> getAllUser(){
		return userService.getAllUser();
	}
	
	@RequestMapping(value="/update", consumes="application")
	public UserTo updateUser(@RequestBody UserTo userTo){
		
		return null;
	}
}
