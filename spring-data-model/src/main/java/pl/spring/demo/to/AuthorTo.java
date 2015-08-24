package pl.spring.demo.to;

public class AuthorTo {
	private String firstName;
	private String lastName;
	private Long id;
	
	public AuthorTo() {
    }
	
	public AuthorTo(Long id, String firstName, String lastName){
		this.setId(id);
		this.setFirstName(firstName);
		this.setLastName(lastName);
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}
