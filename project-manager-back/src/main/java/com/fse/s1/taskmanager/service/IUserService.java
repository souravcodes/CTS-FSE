package com.fse.s1.taskmanager.service;

import java.util.List;

import com.fse.s1.taskmanager.to.UserTo;

public interface IUserService {

	public UserTo addUser(UserTo userTo);
	public List<UserTo> getAllUser();
}
