package es.uvigo.esei.daa.entities;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

public class PetUnitTest {

	@Test
	public void testPetIntStringPerson() {
		final int id = 1;
		final String name = "John";
		final int owner = 1;
		
		final Pet pet = new Pet(id, name, owner);
		
		assertThat(pet.getId(), is(equalTo(id)));
		assertThat(pet.getName(), is(equalTo(name)));
		assertThat(pet.getOwner(), is(equalTo(owner)));
	}
	
		
		@Test(expected = NullPointerException.class)
		public void testPetIntStringPersonNullName() {
			new Pet(1, null, 1);
		}
		
		@Test(expected = NullPointerException.class)
		public void testPetIntStringStringNullOwner() {
			new Pet(1, "Puppy", 1);
		}
		
		@Test
		public void testSetName() {
			final int id = 1;
			final Person owner = new Person(1, "John", "Smith");
			
			final Pet pet = new Pet(id, "Petty", 1);
			pet.setName("Gato");
			
			assertThat(pet.getId(), is(equalTo(id)));
			assertThat(pet.getName(), is(equalTo("Gato")));
			assertThat(pet.getOwner(), is(equalTo(owner)));
		}
		
		@Test(expected = NullPointerException.class)
		public void testSetNullName() {
			final Pet pet = new Pet(1, "Petty", 1);
			
			pet.setName(null);
		}
		
		@Test
		public void testSetOwner() {
			final int id = 1;
			final String name = "Petty";
			Person owner = new Person(2,"Dolores", "Lola");
			
			final Pet pet = new Pet(id, name, 1);
			pet.setOwner(1);
			
			assertThat(pet.getId(), is(equalTo(id)));
			assertThat(pet.getName(), is(equalTo(name)));
			assertThat(pet.getOwner(), is(equalTo(owner)));
		}
		
		@Test(expected = NullPointerException.class)
		public void testSetNullOwner() {
			final Pet pet = new Pet(1, "Petty", 1 );
			
			pet.setOwner(1);
		}
		
		@Test
		public void testEqualsObject() {
			final Pet pet1 = new Pet(1, "Name A",1);
			final Pet pet2 = new Pet(1, "Name B",2);
			
			assertTrue(pet1.equals(pet2));
		}

		@Test
		public void testEqualsHashcode() {
			EqualsVerifier.forClass(Pet.class)
				.withIgnoredFields("name")
				.suppress(Warning.STRICT_INHERITANCE)
				.suppress(Warning.NONFINAL_FIELDS)
			.verify();
		}
		
	}
