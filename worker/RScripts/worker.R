require(jsonlite, quietly = TRUE)

output <- function (json) {
  input <- fromJSON(json)
  rnorm(input$n)
}
