import React,{useContext} from 'react'
import {Card,Icon,Label,Image,Button,Popup} from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


function PostCard({post:{body,createdAt,id,username,likeCount,commentCount,likes}}){

    const {user} = useContext(AuthContext)


    return(
     
        <Card fluid>

        
            <Card.Content>
                 <Image size='mini' floated='right' src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    <span className='date'>{moment(createdAt).fromNow(true)}</span>
                </Card.Meta>
                <Card.Description>
                   {body}
                </Card.Description>
            </Card.Content>

            <Card.Content extra>
                
                <LikeButton user={user} post={{id,likes,likeCount}}/>
                <Popup 
                    content='Comment on post'
                    inverted
                    trigger={
                        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                            <Button color='blue' basic>
                                <Icon name='comments' />                
                            </Button>
                            <Label basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }/>
                

                {user && user.username === username && <DeleteButton postId={id}/>}

            </Card.Content>

        </Card>   

    )

}


export default PostCard