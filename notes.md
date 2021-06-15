A site to share bytes of images/ text/ code about a topic

- A post could contain author, insta link, tags
- A reaction maybe?

Schema ?

Me -> My posts -> Reactions

Users table
Posts table
Tags table?

On User view -> show User info and his posts
ON post view -> SHow post, user info and Reactions

User -> post => one -> many
Post -> User => One -> one
Tags -> Post => Many -> Many

[Tags: Database schemas](https://howto.philippkeller.com/2005/04/24/Tags-Database-schemas/)

API

Bytes
/api/bytes -> Return limited bytes
/api/bytes/:byte -> Return specific byte

/api/tags -> Return all available tags
/api/tags/:tag -> Return posts with this tag

---

Flow
Auth users

- Log In
- CLick upload -> auth ? upload page : log in page, then upload page?
-
