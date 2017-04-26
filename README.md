# What I did
I was able to complete all the components of the lab. I have a search bar that allows users to enter a title and create a note. To edit notes, users can click the pencil icon on the note and a modal will pop up that will allow the user to change the title and content of the note. To drag the note, the user can click on the arrows icon. To delete the note, the user can click on the trash icon. The two buttons on the top right corner allow the user to switch between boards. Finally, the notes data was stored and maintained in Firebase. </br></br>
IMPORTANT NOTE: For my EC I allow the user to switch between two boards. The only issue is that if more than one user is using the site and they are on different boards, then firebase gets mixed up between boards. In order to test that notes, positions, and updates persist in real time for my program, make sure that users are on the same board at the same time.


# What worked
It worked really well to make the Note component a dumb component because it made maintaining data firebase so much simpler.

# What didn't work
It was difficult at first to figure out how to construct components and use state/props in react. Once I got the hang of it, things made sense. Firebase also took a little while to figure out

# EC
I was able to snap the notes to a grid of [100, 100] and incorporate multiple note boards. There are 2 buttons to the top right of the display that allow users to control what note board they want to be on.
