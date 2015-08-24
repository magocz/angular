package pl.spring.demo.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import pl.spring.demo.entity.AuthorEntity;
import pl.spring.demo.to.AuthorTo;

public class AuthorMapper {

	public static Set<AuthorEntity> mapAuthorEntiety(Set<AuthorTo> authors) {
		return authors.stream().map(AuthorMapper::map).collect(Collectors.toSet());
	}

	public static Set<AuthorTo> mapAuthorTo(Set<AuthorEntity> authors) {
		return authors.stream().map(AuthorMapper::map).collect(Collectors.toSet());
	}
	
	public static List<AuthorTo> mapAuthorTo(List<AuthorEntity> authors) {
		return authors.stream().map(AuthorMapper::map).collect(Collectors.toList());
	}

	public static AuthorEntity map(AuthorTo authorTo) {
		return new AuthorEntity(authorTo.getId(), authorTo.getFirstName(), authorTo.getLastName());
	}

	public static AuthorTo map(AuthorEntity authorEntity) {
		return new AuthorTo(authorEntity.getId(), authorEntity.getFirstName(), authorEntity.getLastName());
	}
}
