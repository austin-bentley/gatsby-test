import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"

const IndexPage = () => {
  const [clientDadJoke, setClientDadJoke] = useState("")
  const gatsbyDadJoke = useStaticQuery(graphql`
    query {
      dadjokes {
        joke {
          id
          joke
        }
      }
    }
  `)

  useEffect(() => {
    fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        const { joke } = result
        setClientDadJoke(joke)
      })
  }, [])

  const {
    dadjokes: {
      joke: { joke },
    },
  } = gatsbyDadJoke

  return (
    <Layout>
      <h1>What's important</h1>
      <p>
        {" "}
        Gatsby gathers all data that the application will need server-side with
        graphql/node. Then Gatsby get's it all again at runtime on the client(if
        you tell it too). While this data may appear new it's only rerendering
        old data stored at compile time after the client reaches out for new
        data.
      </p>

      <p>Note: reload the page for updated runtime jokes</p>
      <h2>compiled joke</h2>
      <p>{joke}</p>
      <h2>runtime joke</h2>
      <p>{clientDadJoke}</p>
      <h2>What it looks like together</h2>
      <p>{getMostRecentJoke(joke, clientDadJoke)}</p>
      <h3>What's that mean for my application?</h3>
      <p>
        {" "}
        Your page rendered data is only as recent as your latest deploy. Let's
        say someone makes a change to a post through a CMS and lets also say
        that doesn't happen often. You'll need to redeploy your application for
        the server side rendered data to be updated thus regaining google's
        ability to properly index the page and provide accurate results
      </p>
    </Layout>
  )
}

function getMostRecentJoke(ssJoke, clientJoke) {
  return clientJoke ? clientJoke : ssJoke
}

export default IndexPage
