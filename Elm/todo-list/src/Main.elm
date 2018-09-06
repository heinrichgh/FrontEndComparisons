import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Lazy exposing (lazy)
import Task
import Time


main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias ListItem =
    {
        id : Int
      , label : String
      , created : Time.Posix
      , done : Bool
      , zone : Time.Zone
    }

type alias Model =
    {
        newItem: String
        , items : List ListItem
        , nextItemId : Int
        , zone : Time.Zone
    }

init : () -> (Model, Cmd Msg)
init _ =
    (Model "" [] 0 Time.utc
    , Task.perform AdjustTimeZone Time.here
    )


-- UPDATE

type Msg = NewItem String | AddItem | MarkDone Int | Delete Int | AdjustTimeZone Time.Zone | OnTime (Time.Posix, Int)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewItem itemLabel ->
      ({model | newItem = itemLabel}
        , Cmd.none
      )
    AddItem ->
      let
        newListItem = {
               id = model.nextItemId
             , label = model.newItem
             , created = (Time.millisToPosix 0)
             , done = False
             , zone = model.zone
            }
      in
          ({model | items = newListItem :: model.items, nextItemId = model.nextItemId + 1, newItem = ""}
            , Task.perform OnTime (timeWithId model.nextItemId)
          )
    OnTime (time, id) ->
        let
            setItemTime: ListItem -> ListItem
            setItemTime item =
                if item.id == id then
                    {item | created = time }
                else
                    item
        in
            ({model | items = List.map setItemTime model.items }
             , Cmd.none
            )
    MarkDone id ->
        let
            markItemDone: ListItem -> ListItem
            markItemDone item =
                if item.id == id then
                    {item | done = True }
                else
                    item
        in
            ({model | items = List.map markItemDone model.items }
             , Cmd.none
            )
    Delete id ->
        ({model | items = List.filter (\item -> not (item.id == id) ) model.items }
        , Cmd.none
        )
    AdjustTimeZone newZone ->
      ( { model | zone = newZone }
        , Cmd.none
      )



timeWithId : Int -> Task.Task x (Time.Posix , Int)
timeWithId id =
    Time.now
        |> Task.andThen (\t -> Task.succeed (t, id))


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- VIEW

view : Model -> Html Msg
view model =
    div [ class "row justify-content-center"] [
        div [ class "col-4" ] [
            h1 [] [ text "Todo List" ]
            , div [ class "input-group mb-3" ] [
                input [ type_ "text", placeholder "Todo Item", class "form-control", onInput NewItem, value model.newItem] []
                , div [ class "input-group-append"] [
                    button [ type_ "button", class "btn btn-outline-primary", onClick AddItem ] [ text "Add Item" ]
                 ]
            ]
            , div [] (List.map (lazy listItemView) model.items)
        ]
    ]

listItemView : ListItem -> Html Msg
listItemView item =
    let
        year   = String.fromInt (Time.toYear   item.zone item.created)
        month  = monthToNumericString (Time.toMonth  item.zone item.created)
        day    = String.fromInt (Time.toDay    item.zone item.created)
        hour   = String.fromInt (Time.toHour   item.zone item.created)
        minute = String.fromInt (Time.toMinute item.zone item.created)
        second = String.fromInt (Time.toSecond item.zone item.created)
    in
    div [ class "list-group-item", classList [("list-group-item-success", item.done)] ] [
        div [] [
            text item.label
            , div [ class "float-right" ] [
                if not item.done then
                    button [ class "btn btn-sm btn-outline-success", onClick (MarkDone item.id) ] [ text "Done" ]
                else
                    text ""
                , button [ class "btn btn-sm btn-outline-danger", onClick (Delete item.id) ] [ text ( String.fromChar (Char.fromCode 215)) ]
            ]
        ]
        , div [ class "text-muted small" ] [
            text (year ++ "-" ++ month ++ "-" ++ day ++ " " ++ hour ++ ":" ++ minute ++ ":" ++ second)
        ]
    ]

monthToNumericString : Time.Month -> String
monthToNumericString month =
  case month of
    Time.Jan -> "01"
    Time.Feb -> "02"
    Time.Mar -> "03"
    Time.Apr -> "04"
    Time.May -> "05"
    Time.Jun -> "06"
    Time.Jul -> "07"
    Time.Aug -> "08"
    Time.Sep -> "09"
    Time.Oct -> "10"
    Time.Nov -> "11"
    Time.Dec -> "12"