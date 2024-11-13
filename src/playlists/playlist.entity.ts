import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playLists')
export class PlayList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Song, (song) => song.playList)
    songs: Song[];
    
    @ManyToOne(() => User, (user) => user.playList)
    user: User;
}