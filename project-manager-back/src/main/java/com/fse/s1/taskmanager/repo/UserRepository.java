package com.fse.s1.taskmanager.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fse.s1.taskmanager.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
