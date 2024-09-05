*Question 1*


From: marissa@startup.com
Subject:  Bad design

Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Thanks,
Marissa

> <br>
>
> Hi Marissa,
>
>I'm sorry to hear that it has become more difficult to manage your indexes with the new dashboard design, and I'm happy to help in any way I can.  The idea behind adding more layers of interaction before indexes can be cleared or destroyed was to help prevent our users from deleting them by accident.  However, there is a faster way to delete indexes with less clicks - through our API!  Here's how to do it:
>
>Clearing records from an index: https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/#clear-records-from-an-index-with-the-api
>
>Deleting indexes: https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/#delete-indices-with-the-api
>
>If you need any help getting these methods to work, feel free to let me know and we can jump on a call to walk through how to get this implemented for you!
>
>Best,
>Greg
>
> <br>

--

*Question 2*:

From: carrie@coffee.com
Subject: URGENT ISSUE WITH PRODUCTION!!!!

Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".

Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?

Please advise on how to fix this. Thanks.

> <br>
>
> Hi Carrie,
>
>Thanks for letting us know about this issue, we're actively looking into it.  My initial thoughts are to try to cut down the amount of data being sent to Algolia, including some of the metadata you mentioned.  Here are some ways to do that effectively:https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/reducing-object-size/
>
>Additionally, for long user reviews, you may need to split up the content into smaller chunks:
>https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/indexing-long-documents/
>
>To get this resolved ASAP, I'm happy to jump on a screenshare to pinpoint the exact issue and help implement an effective workaround.
>
>Best,
>Greg
>
> <br>

--

*Question 3*:


From: marc@hotmail.com
Subject: Error on website

Hi, my website is not working and here's the error:

![error message](./error.png)

Can you fix it please?

> <br>
>
>Hi Marc,
>
>Thanks for reaching out.  I'll need to gather some more information about the issue before being able to help you effectively.  Can you provide any further context regarding which Algolia product you were having issues with?
>
>Best,
>Greg
>
> <br>
