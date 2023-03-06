Feature: Create user

Scenario: Create new user
  Given User is logged in
  When user navigate to PIM page
  And click on Add button
  And enter required data
  And click on Save button
  Then user is on Personal Details page
  
