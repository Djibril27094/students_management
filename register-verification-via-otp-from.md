## Register verification with email OTP 
----------------------------------------------------------------------------------------------
1. Create verify_status and otp_digit fields in table
2. without verify_status=true, user can not login
3. After register , user will register on OTP verification page and reveive an email with 6 digit OTP
4. After successfull OTP verification user will redirect on login page OR show related error 