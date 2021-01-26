import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Post } from "src/environments/interface";



@Injectable({providedIn: 'root'})
export class PostsService {

    post: Post[] = []



    constructor(private http: HttpClient) {}

    // posts: Post[] = [
    //     {title: 'Post1', img: 'https://klike.net/uploads/posts/2019-03/medium/1551512888_2.jpg', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.1', id: 10},
    //     {title: 'Post2', img: 'https://bipbap.ru/wp-content/uploads/2017/11/crop-1.jpg', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.2Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.2Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, totam? Consectetur officia minus magnam magni aperiam, repellendus aliquid tempora ipsam.2', id: 8},
    // ]

    // getById(id: number) {
    //     return this.posts.find(p => p.id === id)
    // }

    getById(id: number): Observable<Post> {
        return this.http.get<Post>(`${environment.DbUrl}/posts/${id}.json`)
        .pipe(map((post: Post) => {
            return {
                ...post,
                id,
                // date: new Date(post.date)
            }
        }))
    }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.DbUrl}/posts.json`, post)
        .pipe(map((response: {[name: string]: any}) => {
            return {
                ...post,
                id: response.name,
                // date: new Date(post.date)
            }
        }))
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.DbUrl}/posts.json`)
        .pipe(map((response: {[key: string]: any}) => {
            return Object
            .keys(response)
            .map(key => ({
                ...response[key],
                id: key
            }))
        }))
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.DbUrl}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.DbUrl}/posts/${post.id}.json`, post)
    }
}