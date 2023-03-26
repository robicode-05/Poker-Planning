# Poker Planning

A poker planning application for the agile method.

## Description

Planning poker is an Agile estimating technique used to estimate the effort required for a task or user story.
Team members use playing cards numbered based on the Fibonacci sequence to represent different levels of effort.
Each team member selects a card to represent their estimate of effort, and the cards are revealed simultaneously.
The team discusses any discrepancies in the estimates until a consensus is reached.
The final estimation is used to plan and track the team's progress throughout the project.

## Getting Started

### Dependencies

* Web server supporting PHP to run the app 
* MySql

The recommanded way to start is to used a web developpment suite  

P.S: You can use what you prefer, but the reamde instruction will base on [XAMPP](https://www.apachefriends.org/fr/index.html)


### Installing

* Get XAMPP at https://www.apachefriends.org/fr/index.html
* Follow the installer instructions.

### Configuring the server

1. clone the repository inside *<xampp_install_dir>/htdocs*  
 ex: "C:\xampp\htdocs"
```
cd C:/xampp/htdocs && git clone https://github.com/Passific/Poker-Planning.git
```

2. Launch XAMPP Control Panel, and start "Apache" & "MySql"  

| ![alt text](/img/launch_services.png)| ![alt text](/img/running_services.png) |

3. Open PHPMyAdmin by cliocking on the "admin" button of MySql inside XAMPP Control Panel
Create a table and a user.

![admin](/img/adminsql.png)

4. Fill the **config.bdd.php** with the information of your database and user

```php
$site_bdd_host='127.0.0.1'; // for this local devserver example
$site_bdd_name='poker'; // your BD Name
$site_bdd='mysql:host='.$site_bdd_host.';dbname='.$site_bdd_name;

$site_bdd_user='dev'; // Your user name (defaut is root with no password)
$site_bdd_pass='dev';
```

5. Open your webbrowser at the adress **http://localhost/Poker-Planning**
The site is now open, and the landing page is shown

![landing](/img/landingpage.png)

### Executing program

TODO
* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Authors

Contributors names and contact info  
[Passific](https://github.com/Passific)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the GNU General Public License v3.0 License - see the LICENSE.md file for details
