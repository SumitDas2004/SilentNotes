package com.silentNotes.Main.service;

import com.silentNotes.Main.Exceptions.InvalidPasswordFormatException;
import com.silentNotes.Main.Exceptions.PasswordDoesNotMatchException;
import com.silentNotes.Main.Exceptions.UserAlreadyExistException;
import com.silentNotes.Main.Exceptions.UserDoesNotExistException;
import com.silentNotes.Main.configuration.JWTService;
import com.silentNotes.Main.constants.Utils;
import com.silentNotes.Main.dao.UserDao;
import com.silentNotes.Main.dto.user.LoginDTO;
import com.silentNotes.Main.dto.user.RegistrationDTO;
import com.silentNotes.Main.dto.user.UserDetailsDTO;
import com.silentNotes.Main.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDao userDao;

    String regexPattern = "^(?=.*[0-9])"//Ensures presence of at least a digit
            + "(?=.*[a-z])(?=.*[A-Z])"//Ensures presence of a uppercase and a lowercase character
            + "(?=.*[@#$%^&+=])"//Ensures presence of a special character
            + "(?=\\S+$).{8,20}$";//Ensures length between 8-20

    public String register(RegistrationDTO request) {
        if(!request.getPassword().matches(regexPattern))throw new InvalidPasswordFormatException();

        if(userDao.findByUsername(request.getUsername()).isPresent() || userDao.findByEmail(request.getEmail()).isPresent())throw new UserAlreadyExistException();

        Users user = Users.builder()
                .avatar(request.getAvatar())
                .college(request.getCollege())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .email(request.getEmail())
                .build();
        String id = userDao.save(user).getId();

       return jwtService.generateToken(id);

    }

    public String login(LoginDTO request) {
            Optional<Users> optionalUser = userDao.findByUsername(request.getUsername());
            if(optionalUser.isEmpty())throw new UserDoesNotExistException();
            Users user = optionalUser.get();
            if(!passwordEncoder.matches(request.getPassword(), user.getPassword()))throw new PasswordDoesNotMatchException();

        return jwtService.generateToken(user.getId());
    }

    public UserDetailsDTO getUserDetails(String userId){
        Users user = getUserById(userId);
        return UserDetailsDTO.builder()
                .id(user.getId())
                .username(user.getActualUsername())
                .avatar(user.getAvatar())
                .collegeDomain(Utils.extractDomain(user.getEmail()))
                .collegeName(user.getCollege())
                .build();
    }


    public boolean isUsernameAvailable(String username){
        return !userDao.existsByUsername(username);
    }

    public Users getUserById(String id){
        Optional<Users> optionalUser = userDao.findById(id);
        if(optionalUser.isEmpty())throw new UserDoesNotExistException();
        return optionalUser.get();
    }

    public Users saveUser(Users user){
       return userDao.save(user);
    }


}
