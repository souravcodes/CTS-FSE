package com.fse.s1.taskmanager.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fse.s1.taskmanager.entity.User;
import com.fse.s1.taskmanager.repo.UserRepository;
import com.fse.s1.taskmanager.to.UserTo;
import com.fse.s1.taskmanager.util.Util;

@Service
public class UserService implements IUserService {

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserTo addUser(UserTo userTo) {
		User user = Util.exchangeUserAndUserTo(userTo, new User());
		user = userRepo.save(user);
		if(user != null && user.getUserId() != 0L)
			return Util.exchangeUserAndUserTo(user, userTo);
		else
			return userTo;
	}

	@Override
	public List<UserTo> getAllUser() {
		List<UserTo> userList = new LinkedList<>();
		userRepo.findAll().forEach(e -> {
			UserTo ut = Util.exchangeUserAndUserTo(e, new UserTo());
			userList.add(ut);
		});
		return userList;
	}

}
